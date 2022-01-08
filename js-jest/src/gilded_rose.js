class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const AGED_BRIE = "Aged Brie";
const SULFURAS = "Sulfuras, Hand of Ragnaros";
const BACKSTAGE_PASSES = "Backstage passes to a TAFKAL80ETC concert";
const CONJURED = "Conjured Mana Cake";

class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateQualityItem() {
    for (const item of this.items) {
      this.updateQuality(item);
    }
  }

  updateQuality(item) {
    const doesQualityDecrease = item.name !== AGED_BRIE && item.name !== BACKSTAGE_PASSES && item.name !== SULFURAS;
    const isExpired = item.sellIn < 1
    const decreaseRate = this.getQualityDecreaseRate(item, isExpired);

    if ( doesQualityDecrease ) {
        this.changeQuality(item, decreaseRate);
    }
    if ( item.name === AGED_BRIE ) {
        this.changeQuality(item, 1);
    }
    if (item.name === BACKSTAGE_PASSES) {
      this.updateBackstagePassQuality(item, isExpired);
    }
    if (item.name !== SULFURAS) {
      item.sellIn = item.sellIn - 1;
    }

    if ( isExpired ) {
      if ( doesQualityDecrease ) {
        this.changeQuality(item, decreaseRate);
      }
      if ( item.name === AGED_BRIE ) {
        this.changeQuality(item, 1);
      }

    return this.items;
    }
  }

  changeQuality( item, change ) {
    const newQuality = item.quality += change;
    const inValidRange = newQuality >= 0 && newQuality <= 50;
    item.quality = inValidRange ? newQuality : item.quality;
  }

  getQualityDecreaseRate(item, isExpired) {
    const baseQualityDecreaseRate = item.name === CONJURED ? -2 : -1;
    return isExpired ? baseQualityDecreaseRate * 2 : baseQualityDecreaseRate;
  }

  updateBackstagePassQuality(item, isExpired) {
    this.changeQuality(item, 1);
    if (item.sellIn < 11) {
      this.changeQuality(item, 1);
    }
    if (item.sellIn < 6) {
      this.changeQuality(item, 1);
    }
    if ( isExpired ) {
      this.changeQuality(item, -item.quality);
    }
  }
}

module.exports = {
  Item,
  Shop
}
