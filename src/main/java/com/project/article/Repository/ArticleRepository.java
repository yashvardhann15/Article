package com.project.article.Repository;

import com.project.article.Models.Article;
import com.project.article.Projections.ArticleProjection;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ArticleRepository extends JpaRepository<Article, Long> {
    ArticleProjection findProjectedById(long id);
    Article  save(Article article);

    List<ArticleProjection> findAllProjectedBy();
}
