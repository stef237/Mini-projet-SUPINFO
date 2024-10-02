package steph.meme_backend.model;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Document(collection = "memes")
public class Meme {

    @Id
    private String id;

    private String imageUrl;
    private String topText;
    private String bottomText;

}
