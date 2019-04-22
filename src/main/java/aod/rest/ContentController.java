package aod.rest;
import aod.entities.Content;
import aod.entities.ContentReply;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import aod.repositories.ContentReplyRepository;
import aod.repositories.ContentRepository;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
public class ContentController {

    private ContentReplyRepository contentReplyRepository;

    private ContentRepository contentRepository;

    @Autowired
    public ContentController(ContentRepository contentRepository,
            ContentReplyRepository contentReplyRepository){
        this.contentReplyRepository = contentReplyRepository;
        this.contentRepository = contentRepository;
    }

    @GetMapping(value="/contents")
    public ResponseEntity<?> getAllContent(){
        List<Content> list = new ArrayList<>();
        contentRepository.findAll().forEach(e -> list.add(e));
        return new ResponseEntity<>(list, HttpStatus.OK);
    }


    @PostMapping(value="/contents/replies")
    @ResponseBody
    public ResponseEntity<?> getContentReplies(@RequestParam("contentId") Integer contentId){
        List<ContentReply> list = new ArrayList<>();
        contentReplyRepository.findByContentId(contentId).forEach(e -> list.add(e));
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping(value="/contents/replies/post/{contentId}")
    public ResponseEntity<?> postContentReply(@PathVariable("contentId") Integer contentId,
                                              @Valid @RequestBody ContentReply reply) {
        try {
            contentRepository.findById(contentId).map(content -> {
                reply.setContent(content);
                return contentReplyRepository.save(reply);
            }).orElseThrow(() -> new RuntimeException("Content Id: [" + contentId + "] not found."));
        } catch(RuntimeException e){
            return new ResponseEntity<>(e, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @PostMapping(value="contents/post")
    public ResponseEntity<?> postContent(@Valid @RequestBody Content content){
        contentRepository.save(content);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
}
