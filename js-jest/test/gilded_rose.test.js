const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", function() {

  describe("Aged Brie", function() {
    it("increases quality by 1", function() {
      const gildedRose = new Shop([new Item("Aged Brie", 1, 1)]);
      gildedRose.updateQualityItem();
      expect(gildedRose.items[0].quality).toBe(2);
    });
    it("increases quality by maximum of 50", function() {
      const gildedRose = new Shop([new Item("Aged Brie", 3, 50)]);
      gildedRose.updateQualityItem();
      expect(gildedRose.items[0].quality).toBe(50);
    });
    it("increases quality by 2 due to item being expired", function() {
      const gildedRose = new Shop([new Item("Aged Brie", 0, 1)]);
      gildedRose.updateQualityItem();
      expect(gildedRose.items[0].quality).toBe(3);
    });
    it("increases quality when sellIn is negative", function() {
      const gildedRose = new Shop([new Item("Aged Brie", -1, 1)]);
      gildedRose.updateQualityItem();
      expect(gildedRose.items[0].quality).toBe(3);
    });
  });

  describe("Backstage passes to a TAFKAL80ETC concert", function() {
    it("increases quality maximum of 50", function() {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 11, 50)]);
      gildedRose.updateQualityItem();
      expect(gildedRose.items[0].quality).toBe(50);
    });
    it("increases quality by 1 when sellIn > 10", function() {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 11, 20)]);
      gildedRose.updateQualityItem();
      expect(gildedRose.items[0].quality).toBe(21);
    });
    it("increases quality by 2 when sellIn <= 10", function() {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20)]);
      gildedRose.updateQualityItem();
      expect(gildedRose.items[0].quality).toBe(22);
    });
    it("increases quality by 3 when sellIn <= 5", function() {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20)]);
      gildedRose.updateQualityItem();
      expect(gildedRose.items[0].quality).toBe(23);
    });
    it("set quality to zero when sellIn = 0", function() {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20)]);
      gildedRose.updateQualityItem();
      expect(gildedRose.items[0].quality).toBe(0);
    });
    it("set quality to zero when sellIn < 0", function() {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", -1, 20)]);
      gildedRose.updateQualityItem();
      expect(gildedRose.items[0].quality).toBe(0);
    });
  });

  describe("Conjured Mana Cake", function() {
    it("decreases quality by 2 when sellIn > 0", function() {
      const gildedRose = new Shop([new Item("Conjured Mana Cake", 3, 10)]);
      gildedRose.updateQualityItem();
      expect(gildedRose.items[0].quality).toBe(8);
    });
    it("decreases quality by 4 when sellIn = 0", function() {
      const gildedRose = new Shop([new Item("Conjured Mana Cake", 0, 10)]);
      gildedRose.updateQualityItem();
      expect(gildedRose.items[0].quality).toBe(6);
    });
    it("decreases quality by 4 when sellIn < 0", function() {
      const gildedRose = new Shop([new Item("Conjured Mana Cake", -1, 10)]);
      gildedRose.updateQualityItem();
      expect(gildedRose.items[0].quality).toBe(6);
    });
  });

  describe("Sulfuras, Hand of Ragnaros", function() {
    it("does not reduce sellIn value", function() {
      const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 1, 80)]);
      gildedRose.updateQualityItem();
      expect(gildedRose.items[0].sellIn).toBe(1);
    });
    it("does not change quality value", function() {
      const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 1, 80)]);
      gildedRose.updateQualityItem();
      expect(gildedRose.items[0].quality).toBe(80);
    });
  });

  describe("Standard Items", function() {
    it("decrease sellIn by 1", function() {
      const gildedRose = new Shop([new Item("foo", 3, 0)]);
      gildedRose.updateQualityItem();
      expect(gildedRose.items[0].sellIn).toBe(2);
    });
    it("decrease quality value to minimum of 0", function() {
      const gildedRose = new Shop([new Item("foo", 3, 0)]);
      gildedRose.updateQualityItem();
      expect(gildedRose.items[0].quality).toBe(0);
    });
    it("decrease quality value by 1 if sellIn > 0", function() {
      const gildedRose = new Shop([new Item("foo", 3, 3)]);
      gildedRose.updateQualityItem();
      expect(gildedRose.items[0].quality).toBe(2);
    });
    it("decrease quality value by 2 if sellIn = 0", function() {
      const gildedRose = new Shop([new Item("foo", 0, 3)]);
      gildedRose.updateQualityItem();
      expect(gildedRose.items[0].quality).toBe(1);
    });
    it("decrease quality value by 2 if sellIn < 0", function() {
      const gildedRose = new Shop([new Item("foo", -1, 3)]);
      gildedRose.updateQualityItem();
      expect(gildedRose.items[0].quality).toBe(1);
    });
  });
});
