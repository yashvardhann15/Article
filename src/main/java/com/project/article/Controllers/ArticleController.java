package com.project.article.Controllers;

import com.project.article.Dto.CreateArticleRequestDto;
import com.project.article.Models.Article;
import com.project.article.Projections.ArticleProjection;
import com.project.article.Services.ArticleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ArticleController {

    public ArticleService articleService;
    public ArticleController(ArticleService articleService){
        this.articleService = articleService;
    }

    @GetMapping("/articles")
    public ResponseEntity<List<ArticleProjection>> getAllArticles(){
        List<ArticleProjection> articles = articleService.getAllArticles();
        ResponseEntity<List<ArticleProjection>> responseEntity = new ResponseEntity<>(articles , HttpStatus.OK);
        return responseEntity;
    }

    @GetMapping("/articles/{id}")
    public ResponseEntity<ArticleProjection> getSingleArticle(@PathVariable("id") long id){
        ArticleProjection article = articleService.getArticleById(id);
        ResponseEntity<ArticleProjection> responseEntity = new ResponseEntity<>(article , HttpStatus.OK);
        return responseEntity;
    }

    @PostMapping("/articles")
    public ResponseEntity<ArticleProjection> createArticle(@RequestBody CreateArticleRequestDto createArticleRequestDto){
        ArticleProjection article = articleService.createArticle(createArticleRequestDto.getAuthor() , createArticleRequestDto.getTitle() , createArticleRequestDto.getContent());
        ResponseEntity<ArticleProjection> responseEntity = new ResponseEntity<>(article , HttpStatus.CREATED);
        return responseEntity;
    }

}
