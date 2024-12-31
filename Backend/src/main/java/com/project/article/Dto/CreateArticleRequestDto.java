package com.project.article.Dto;

import com.project.article.Models.Author;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CreateArticleRequestDto {
    Author author;
    String title;
    String content;
}
