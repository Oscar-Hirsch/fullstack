package org.example.backend.types;

public record Book (String title, String author, int isbn, String summary, String image, int totalAmount, int totalBookedAmount) {
}
