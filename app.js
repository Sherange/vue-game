new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    isGameRunning: false
  },
  methods: {
    handleStart: function() {
      this.isGameRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
    },
    handleAttack: function() {
      this.monsterHealth -= this.calculateDamge(3, 10);
      if (this.checkWin()) {
        return;
      }
      this.monsterAttack();
      this.checkWin();
    },
    handleSpecialAttack: function() {
      this.monsterHealth -= this.calculateDamge(10, 20);
      if (this.checkWin()) {
        return;
      }
      this.monsterAttack();
      this.checkWin();
    },
    handleHeal: function() {
      if (this.playerHealth <= 90) {
        this.playerHealth += 10;
      } else {
        this.playerHealth = 100;
      }
    },
    handleGiveUp: function() {
      this.isGameRunning = false;
    },
    monsterAttack: function() {
      this.playerHealth -= this.calculateDamge(5, 12);
    },
    calculateDamge: function(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    checkWin: function() {
      if (this.monsterHealth <= 0) {
        if (confirm("You Won , New Game ?")) {
          this.handleStart();
        } else {
          this.isGameRunning = false;
        }
        return true;
      } else if (this.playerHealth <= 0) {
        if (confirm("You Lost , New Game ?")) {
          this.handleStart();
        } else {
          this.isGameRunning = false;
        }
        return true;
      }
      return false;
    }
  }
});
