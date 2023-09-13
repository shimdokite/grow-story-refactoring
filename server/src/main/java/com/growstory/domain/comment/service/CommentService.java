package com.growstory.domain.comment.service;

import com.growstory.domain.account.entity.Account;
import com.growstory.domain.board.entity.Board;
import com.growstory.domain.board.repository.BoardRepository;
import com.growstory.domain.board.service.BoardService;
import com.growstory.domain.comment.dto.CommentDto;
import com.growstory.domain.comment.dto.ResponseCommentDto;
import com.growstory.domain.comment.entity.Comment;
import com.growstory.domain.comment.repository.CommentRepository;
import com.growstory.global.auth.utils.AuthUserUtils;
import com.growstory.global.exception.BusinessLogicException;
import com.growstory.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final BoardRepository boardRepository;
    private final AuthUserUtils authUserUtils;

    public Long saveComment(Long boardId, CommentDto.Post commentDto) {
        Account account = authUserUtils.getAuthUser();
        Board board = boardRepository.findById(boardId)
                .orElseThrow(()-> new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));
        Comment comment = commentRepository.save(commentDto.toEntity(account, board));

        return comment.getCommentId();
    }

    public List<Comment> getComments(Long boardId) {
        return commentRepository.findCommentsByBoard_BoardId(boardId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
    }

    public List<ResponseCommentDto> getCommentList(Long boardId) {
        List<Comment> comments = commentRepository.findCommentsByBoard_BoardId(boardId)
                .orElseThrow(()-> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));

        List<ResponseCommentDto> responseCommentDtoList = comments.stream().map(comment -> ResponseCommentDto.builder()
                .commentId(comment.getCommentId())
                .content(comment.getContent())
                .accountId(comment.getAccount().getAccountId())
                .displayName(comment.getAccount().getDisplayName())
                .profileUrl(comment.getAccount().getProfileImageUrl())
                .commentLikeNum(comment.getCommentLikes().size())
                .createdAt(comment.getCreatedAt()).modifiedAt(comment.getModifiedAt()).build()).collect(Collectors.toList());

        return responseCommentDtoList;
    }


    public void editComment(Long commentId, CommentDto.Patch commentDto) {
        findCommentsMatchCommentId(commentId);

        Comment comment = verifiedComment(commentId);
        comment.update(commentDto.getContent());

    }

    public void deleteComment(Long commentId) {
        findCommentsMatchCommentId(commentId);
        Comment comment = verifiedComment(commentId);
        commentRepository.deleteById(commentId);

        comment.getAccount().getComments().remove(comment);
        comment.getBoard().getBoardComments().remove(comment);
    }

    // Account의 Comments의 입력받은 CommentId와 일치하는 댓글을 찾는 메서드
    private void findCommentsMatchCommentId(Long commentId) {
        Account account = authUserUtils.getAuthUser();

        //commentId와 일치하는 댓글 탐색
        boolean isComment = account.getComments().stream()
                .map(Comment::getCommentId)
                .anyMatch(id -> Objects.equals(id, commentId));

        // 해당 댓글을 찾지 못한 경우 예외 발생
        if (!isComment)
            throw new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND);
    }

    private Comment verifiedComment(Long commentId) {
        return commentRepository.findById(commentId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
    }
}
