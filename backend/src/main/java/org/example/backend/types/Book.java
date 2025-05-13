package org.example.backend.types;

import lombok.With;
import org.springframework.data.annotation.Id;

@With
public record Book( String title, String author, @Id long isbn, String summary, String image, int totalAmount,
                    int totalBookedAmount ) {
}
