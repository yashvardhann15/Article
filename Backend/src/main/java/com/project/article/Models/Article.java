package com.project.article.Models;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Article extends BaseModel{
    private String title;
    @Column(columnDefinition = "TEXT")
    private String content;
    @ManyToOne(cascade = CascadeType.PERSIST)
    private Author author;
}


//u     a
//1     m
//1     1