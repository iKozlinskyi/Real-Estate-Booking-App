package com.ikozlinskyi.realestatebookingapp.repository;

import com.ikozlinskyi.realestatebookingapp.entity.Photo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IPhotoRepository extends JpaRepository<Photo, Integer> {
}
