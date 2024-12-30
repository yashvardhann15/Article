package com.project.article.Repository;

import com.project.article.Models.Author;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Author, Long> {

}
