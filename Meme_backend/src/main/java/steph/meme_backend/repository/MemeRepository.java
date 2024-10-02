package steph.meme_backend.repository;


import org.springframework.data.mongodb.repository.MongoRepository;
import steph.meme_backend.model.Meme;


public interface MemeRepository extends MongoRepository<Meme, String> {

}
