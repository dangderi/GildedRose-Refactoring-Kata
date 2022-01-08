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
    const qualityChange = item.name === CONJURED ? -2 : -1;
    if (item.name !== AGED_BRIE && item.name !== BACKSTAGE_PASSES) {
        if (item.name !== SULFURAS) {
          this.changeQuality(item, qualityChange);
        }
    } else {
        this.changeQuality(item, 1);
        if (item.name === BACKSTAGE_PASSES) {
          if (item.sellIn < 11) {
              this.changeQuality(item, 1);
          }
          if (item.sellIn < 6) {
              this.changeQuality(item, 1);
          }
        }
    }
    if (item.name !== SULFURAS) {
      item.sellIn = item.sellIn - 1;
    }
    if (item.sellIn < 0) {
      if (item.name !== AGED_BRIE) {
        if (item.name !== BACKSTAGE_PASSES) {
            if (item.name !== SULFURAS) {
              this.changeQuality(item, -1);
            }
        } else {
          this.changeQuality(item, -1);
        }
      } else {
          this.changeQuality(item, 1);
      }
    }

    return this.items;
  }

  changeQuality( item, change ) {
    const newQuality = item.quality += change;
    const inValidRange = newQuality >= 0 && newQuality <= 50;
    item.quality = inValidRange ? newQuality : item.quality;
  }
}

module.exports = {
  Item,
  Shop
}
