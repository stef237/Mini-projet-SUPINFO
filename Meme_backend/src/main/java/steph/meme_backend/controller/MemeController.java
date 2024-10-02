package steph.meme_backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import steph.meme_backend.model.Meme;
import steph.meme_backend.service.MemeService;

import java.util.List;

@RestController
@RequestMapping("/api/memes")
public class MemeController {


    private final MemeService memeService;

    public MemeController(MemeService memeService) {
        this.memeService = memeService;
    }

    @GetMapping("/read")
    public List<Meme> getAllMemes() {
        return memeService.getAllMemes();
    }

    @PostMapping("/creer")
    public ResponseEntity<Meme> createMeme(@RequestBody Meme meme) {
        Meme createdMeme = memeService.createMeme(meme);
        return ResponseEntity.ok(createdMeme);
    }


}
