package com.project.article.Services;

import com.project.article.Models.Article;
import com.project.article.Models.Author;
import com.project.article.Projections.ArticleProjection;
import org.antlr.v4.runtime.misc.Pair;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ArticleService {
    List<ArticleProjection> getAllArticles();
    ArticleProjection getArticleById(long id);
    ArticleProjection createArticle(Author author, String title, String content);
    ResponseEntity<Void> deleteArticle(long id);
    Pair<List<ArticleProjection> , Pair<Boolean , Integer>> getAllArticles(int pageNo , int pageSize);
}
