package steph.meme_backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import steph.meme_backend.model.Meme;
import steph.meme_backend.repository.MemeRepository;

import java.util.List;

@RequiredArgsConstructor
@Service
public class MemeService {


    private final MemeRepository memeRepository;

    public List<Meme> getAllMemes() {
        return memeRepository.findAll();
    }

    public Meme createMeme(Meme meme) {
        return memeRepository.save(meme);
    }

}
