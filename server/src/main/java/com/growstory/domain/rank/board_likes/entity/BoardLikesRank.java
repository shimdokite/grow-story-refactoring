package com.growstory.domain.rank.board_likes.entity;

import com.growstory.domain.account.entity.Account;
import com.growstory.domain.board.entity.Board;
import com.growstory.domain.rank.board_likes.dto.BoardLikesRankDto;
import com.growstory.domain.rank.entity.Rank;
import com.growstory.global.exception.BusinessLogicException;
import com.growstory.global.exception.ExceptionCode;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class BoardLikesRank extends Rank {
    @ManyToOne
    @JoinColumn(name = "board_id", nullable = false)
    private Board board;
    private Long likeNum;

    @Builder
    public BoardLikesRank(Board board, Long likeNum, Account account) {
        super(account);
        this.board = board;
        this.likeNum = likeNum;
    }

    public BoardLikesRankDto.Response toResponseDto() {
        return BoardLikesRankDto.Response
                .builder()
                .rank(this.getRankStatus().getRank()) //Rank 에서 상속 받은 rank, account 정보 활용
                .displayName(this.getAccount().getDisplayName())
                .boardId(this.board.getBoardId())
                .title(this.board.getTitle())
                .likeNum(this.likeNum)
                .build();
    }

    public void updateRank(int rank) {
        switch (rank) {
            case 1 :
                super.updateRank(RankStatus.RANK_NO_1);
                break;
            case 2 :
                super.updateRank(RankStatus.RANK_NO_2);
                break;
            case 3 :
                super.updateRank(RankStatus.RANK_NO_3);
                break;
            case 4 :
                super.updateRank(RankStatus.RANK_NO_4);
                break;
            case 5 :
                super.updateRank(RankStatus.RANK_NO_5);
                break;
            default:
                throw new BusinessLogicException(ExceptionCode.RANK_NOT_FOUND);
        }
    }
}