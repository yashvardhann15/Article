package com.project.article.Services;

import com.project.article.Exceptions.ArticleCreationException;
import com.project.article.Exceptions.ArticleNotFoundException;
import com.project.article.Models.Article;
import com.project.article.Models.Author;
import com.project.article.Projections.ArticleProjection;
import com.project.article.Repository.ArticleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("selfArticleService")
public class SelfArticleService implements ArticleService{

    private ArticleRepository articleRepository;

    public SelfArticleService(ArticleRepository articleRepository){
        this.articleRepository = articleRepository;
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
    public ArticleProjection createArticle(Author author, String title, String content) {
        Article article = new Article();
        article.setTitle(title);
        article.setContent(content);
        article.setAuthor(author);
        articleRepository.save(article);
        ArticleProjection createdArticle = articleRepository.findProjectedById(article.getId());
        if (createdArticle == null){
            throw new ArticleCreationException();
        }
        return createdArticle;
    }
}
