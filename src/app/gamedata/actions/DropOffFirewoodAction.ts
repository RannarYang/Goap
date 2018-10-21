/*
 * @Description: 
 * @Author: RannarYang 
 * @Date: 2018-09-06 00:09:17 
 * @Last Modified by:   RannarYang 
 * @Last Modified time: 2018-09-06 00:09:17 
 */
class DropOffFirewoodAction extends GoapAction {
	private droppedOffFirewood: boolean = false;
	private targetSupplyPile: SupplyPileComponent; // where we drop off the firewood
	public constructor() {
		super();
		this.addPrecondition("hasFirewood", true); // can't drop off firewood if we don't already have some
		this.addEffect("hasFirewood", false); // we now have no firewood
		this.addEffect("collectFirewood", true); // we collected firewood
	}

	public reset(): void {
		this.droppedOffFirewood = false;
		this.targetSupplyPile = null;
	}

	public isDone() {
		return this.droppedOffFirewood;
	}
	
	public requiresInRange() {
		return true; // yes we need to be near a supply pile so we can drop off the firewood
	}
	public checkProceduralPrecondition (agent: VGameObject): boolean {
		// TODO:find the nearest supply pile that has spare firewood
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
	
	public perform (iGoap: IGoap): boolean {
		let labourer = iGoap as Labourer;
		let backpack = labourer.backpack;
		backpack.numFirewood += backpack.numFirewood;
		this.droppedOffFirewood = true;
		backpack.numFirewood = 0;
		
		return true;
	}
}