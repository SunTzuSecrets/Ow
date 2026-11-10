import { t } from '@/i18n';

export function calculateMatchPoints(playerAVictoryPoints: number, playerBVictoryPoints: number) {
  const difference = Math.abs(playerAVictoryPoints - playerBVictoryPoints);

  if (difference <= 300) {
    return { playerA: 3, playerB: 3 };
  }

  if (difference <= 750) {
    return playerAVictoryPoints > playerBVictoryPoints
      ? { playerA: 4, playerB: 2 }
      : { playerA: 2, playerB: 4 };
  }

  if (difference <= 1400) {
    return playerAVictoryPoints > playerBVictoryPoints
      ? { playerA: 5, playerB: 1 }
      : { playerA: 1, playerB: 5 };
  }

  return playerAVictoryPoints > playerBVictoryPoints
    ? { playerA: 6, playerB: 0 }
    : { playerA: 0, playerB: 6 };
}

export function battleOutcomeLabel(leftScore: number, rightScore: number) {
  if (leftScore === rightScore) {
    return t('outcome.draw');
  }

  const isWin = leftScore > rightScore;
  const winningScore = Math.max(leftScore, rightScore);

  if (winningScore === 4) {
    return isWin ? t('outcome.minorWin') : t('outcome.minorLoss');
  }

  if (winningScore === 5) {
    return isWin ? t('outcome.majorWin') : t('outcome.majorLoss');
  }

  if (winningScore === 6) {
    return isWin ? t('outcome.massacre') : t('outcome.totalLoss');
  }

  return isWin ? t('outcome.win') : t('outcome.loss');
}
