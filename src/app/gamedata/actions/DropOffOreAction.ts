/*
 * @Description: 
 * @Author: RannarYang 
 * @Date: 2018-09-06 00:11:26 
 * @Last Modified by:   RannarYang 
 * @Last Modified time: 2018-09-06 00:11:26 
 */
class DropOffOreAction extends GoapAction{
	private droppedOffOre = false;
	private targetSupplyPile: SupplyPileComponent; // where we drop off the ore
	public constructor() {
		super();
		this.addPrecondition ("hasOre", true); // can't drop off ore if we don't already have some
		this.addEffect ("hasOre", false); // we now have no ore
		this.addEffect ("collectOre", true); // we collected ore
	}

	public reset() {
		this.droppedOffOre = false;
		this.targetSupplyPile = null;
	}

	public isDone(): boolean {
		return this.droppedOffOre;
	}
	public requiresInRange() {
		return true; // yes we need to be near a supply pile so we can drop off the ore
	}
	public checkProceduralPrecondition (agent: VGameObject): boolean{
		//TODO: find the nearest supply pile that has spare ore
		let supplyPiles: SupplyPileComponent[] = [];
		let closest: SupplyPileComponent = null;
		let closestDist: number = 0;
		
		for (let supply of supplyPiles) {
			if (closest == null) {
				// first one, so choose it for now
				closest = supply;
				closestDist = supply.distanceSquare(agent);
			} else {
				// is this one closer than the last?
				let dist: number = supply.distanceSquare(agent);
				if (dist < closestDist) {
					// we found a closer one, use it
					closest = supply;
					closestDist = dist;
				}
			}
		}
		if (closest == null)
			return false;

		this.targetSupplyPile = closest;
		this.target = this.targetSupplyPile;
		
		return closest != null;
	}
	
	public perform (labourer: Labourer): boolean {
		let backpack: BackPackComponent = labourer.backpack;
		this.targetSupplyPile.numOre += backpack.numOre;
		this.droppedOffOre = true;
		backpack.numOre = 0;
		//TODO play effect, change actor icon
		
		return true;
	}
}