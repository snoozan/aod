package aod.repositories;

import aod.entities.ContentReply;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ContentReplyRepository extends CrudRepository<ContentReply, Integer> {
    List<ContentReply> findByContentId(Integer contentId);

    Optional<ContentReply> findByIdAndContentId(Integer id, Integer contentId);
}
