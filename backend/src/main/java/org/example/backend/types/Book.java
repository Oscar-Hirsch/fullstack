package org.example.backend.types;

public record Book (String title, String author, String isbn, String summary, String image, int totalAmount, int totalBookedAmount) {
}
