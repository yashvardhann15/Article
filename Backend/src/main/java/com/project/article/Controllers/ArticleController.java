package com.project.article.Controllers;

import com.project.article.Dto.CreateArticleRequestDto;
import com.project.article.Models.Article;
import com.project.article.Projections.ArticleProjection;
import com.project.article.Repository.ArticleRepository;
import com.project.article.Services.ArticleService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ArticleController {

    private final ArticleRepository articleRepository;
    public ArticleService articleService;
    public ArticleController(ArticleService articleService, ArticleRepository articleRepository){
        this.articleService = articleService;
        this.articleRepository = articleRepository;
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

    @DeleteMapping("/articles/{id}")
    public ResponseEntity<Void> deleteArticle(@PathVariable("id") long id){
        ResponseEntity<Void> responseEntity = articleService.deleteArticle(id);
        return responseEntity;
    }

    @GetMapping("/articles/page")
    public List<ArticleProjection> getArticlePages(@RequestParam("pageNo") int pageNo , @RequestParam("pageSize") int pageSize){
        Page<ArticleProjection> articles = articleService.getAllArticles(pageNo , pageSize);
        return articles.getContent();
    }
}
