package org.example.backend.types;

import org.springframework.data.annotation.Id;

public record Book (String title, String author, @Id int isbn, String summary, String image, int totalAmount, int totalBookedAmount) {
}
