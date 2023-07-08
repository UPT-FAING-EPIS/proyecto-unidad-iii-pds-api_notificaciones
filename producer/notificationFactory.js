class NotificationFactory {
    constructor() {
      this.strategies = {};
    }
  
    registerStrategy(strategyType, strategy) {
      this.strategies[strategyType] = strategy;
    }
  
    createNotification(notificationType) {
      const strategy = this.strategies[notificationType];
      if (strategy) {
        return strategy;
      } else {
        throw new Error('Tipo de estrategia de notificación inválido');
      }
    }
  }
  
  module.exports = NotificationFactory;