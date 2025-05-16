<script lang="ts" setup>

const userFromServer = {
  username: 'Human',
};

const gameConfig: GameConfig = reactive({
  computer: {
    name: 'Computer',
    diceCount: 2,
    minCount: 1,
    maxCount: 5,
    offset: 3,
    getScore: 0,
  },
  human: {
    name: userFromServer.username,
    diceCount: 2,
    minCount: 1,
    maxCount: 5,
    offset: -3,
    getScore: 0,
  }
})

initGame(gameConfig)

function addDiceToPlayer(role: 'computer' | 'human') {
  handleClick()
  const p = players.value.find(p => p.playerName === gameConfig[role].name)
  if (!p) return
  p.addDice()
  gameConfig[role].diceCount = p.playersDiceCount
}

function removeDiceToPlayer(player: 'computer' | 'human') {
  handleClick()
  const p = players.value.find(p => p.playerName === gameConfig[player].name)
  if (!p) return
  p.removeDice()
  gameConfig[player].diceCount = p.playersDiceCount
}

function rollDiceForAll() {
  handleClick()

  for (const role of ['computer', 'human'] as const) {
    const name = gameConfig[role].name
    const p = players.value.find(p => p.playerName === name)
    if (!p) continue

    const score = p.rollDice()
    gameConfig[role].getScore = score
  }
}

const isCoolingDown = ref(false)
const timeoutDuration = 200

const handleClick = () => {
  if (isCoolingDown.value) {
    return;
  }

  isCoolingDown.value = true;
  setTimeout(() => {
    isCoolingDown.value = false;
  }, timeoutDuration);
};
</script>

<template>
  <main class="game">
    <button :disabled="isCoolingDown" @click="rollDiceForAll">
      Roll Dice
    </button>
    <div class="game--interface--computer">
      <h2>{{ gameConfig.computer.name }}</h2>
      <button :disabled="isCoolingDown" @click="addDiceToPlayer('computer')">
        Add Dice
      </button>
      <p>
        Dice : {{ gameConfig.computer.diceCount }}
      </p>
      <p>
        Score : {{ gameConfig.computer.getScore }}
      </p>
      <button :disabled="isCoolingDown" @click="removeDiceToPlayer('computer')">
        Remove Dice
      </button>
    </div>
    <canvas id='game-screen'></canvas>
    <div class="game--interface--human">
      <h2>
        {{ gameConfig.human.name }}
      </h2>
      <button :disabled="isCoolingDown" @click="addDiceToPlayer('human')">
        Add Dice
      </button>
      <p>
        Dice : {{ gameConfig.human.diceCount }}
      </p>
      <p>
        Score : {{ gameConfig.human.getScore }}
      </p>
      <button :disabled="isCoolingDown" @click="removeDiceToPlayer('human')">
        Remove Dice
      </button>
    </div>
  </main>
</template>

<style scoped>

</style>