new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    isGameRunning: false,
    logs: []
  },
  methods: {
    handleStart: function() {
      this.isGameRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.logs = [];
    },
    handleAttack: function() {
      var damage = this.calculateDamge(3, 10);
      this.monsterHealth -= damage;
      this.logs.unshift({
        isPlayer: true,
        text: "Player hit Monster " + damage
      });
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
      this.logs.unshift({
        isPlayer: true,
        text: "Player heals for 10"
      });
    },
    handleGiveUp: function() {
      this.isGameRunning = false;
    },
    monsterAttack: function() {
      var damage = this.calculateDamge(5, 12);
      this.logs.unshift({
        isPlayer: false,
        text: "Monster hit Player " + damage
      });
      this.playerHealth -= damage;
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
