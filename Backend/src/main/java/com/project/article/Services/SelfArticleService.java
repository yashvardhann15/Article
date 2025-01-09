package com.project.article.Services;

import com.project.article.Exceptions.ArticleCreationException;
import com.project.article.Exceptions.ArticleNotFoundException;
import com.project.article.Models.Article;
import com.project.article.Models.Author;
import com.project.article.Projections.ArticleProjection;
import com.project.article.Repository.ArticleRepository;
import com.project.article.Repository.UserRepository;
import org.antlr.v4.runtime.misc.Pair;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("selfArticleService")
public class SelfArticleService implements ArticleService{

    private ArticleRepository articleRepository;
    private UserRepository userRepository;

    public SelfArticleService(ArticleRepository articleRepository , UserRepository userRepository){
        this.articleRepository = articleRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<ArticleProjection> getAllArticles() throws RuntimeException{
        List<ArticleProjection> articles =  articleRepository.findAllProjectedBy();
        if(!articles.isEmpty()) {
            return articles;
        }
        else throw new ArticleNotFoundException();
    }

    @Override
    public ArticleProjection getArticleById(long id) {
        ArticleProjection article = articleRepository.findProjectedById(id);
        if(article == null){
            throw new ArticleNotFoundException();
        }
        return article;
    }

    @Override
    public ArticleProjection createArticle(Author userName, String title, String content) {
        Author author = userRepository.findByName(userName.getName());
        if (author == null) {
            author = new Author();
            author.setName(userName.getName());
            author = userRepository.save(author);
        }

        Article article = new Article();
        article.setTitle(title);
        article.setContent(content);
        article.setAuthor(author);
        articleRepository.save(article);

        ArticleProjection createdArticle = articleRepository.findProjectedById(article.getId());
        if (createdArticle == null) {
            throw new ArticleCreationException();
        }

        return createdArticle;
    }

    @Override
    public ResponseEntity<Void> deleteArticle(long id) {
        if(articleRepository.existsByIdAndIsDeletedFalse(id)){
            Article article = articleRepository.findById(id);
            article.setIsDeleted();
            articleRepository.save(article);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        else throw new ArticleNotFoundException();
    }

    @Override
    public Pair<List<ArticleProjection> , Pair<Boolean , Integer>> getAllArticles(int pageNo , int pageSize) {

        Page<ArticleProjection> pageOfArticles = articleRepository.findAllProjection(PageRequest.of(pageNo, pageSize , Sort.by("createdAt").descending()));
        Boolean hasNext = pageOfArticles.hasNext();
        Integer totalPages = pageOfArticles.getTotalPages();
        return new Pair<>(pageOfArticles.getContent() , new Pair<>(hasNext , totalPages));
    }
}
