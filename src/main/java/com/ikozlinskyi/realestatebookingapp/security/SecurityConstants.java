package com.ikozlinskyi.realestatebookingapp.security;

public class SecurityConstants {

  public static final String SIGN_UP_URLS = "/api/users/**";
  public static final String SECRET = "SecretKeyToGenJWTs";
  public static final String TOKEN_PREFIX = "Bearer ";
  public static final String HEADER_STRING = "Authorization";
  public static final long EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 30L; //1 month
}
