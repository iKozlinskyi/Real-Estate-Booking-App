package com.ikozlinskyi.realestatebookingapp.service;

import com.ikozlinskyi.realestatebookingapp.entity.Photo;
import com.ikozlinskyi.realestatebookingapp.repository.IPhotoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PhotoServiceImpl implements IPhotoService {

  private IPhotoRepository photoRepository;

  @Autowired
  public PhotoServiceImpl(IPhotoRepository photoRepository) {
    this.photoRepository = photoRepository;
  }

  @Override
  public void delete(Photo photo) {
    this.photoRepository.delete(photo);
  }
}
