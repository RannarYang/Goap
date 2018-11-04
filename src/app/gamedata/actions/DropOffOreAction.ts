/*
 * @Description: 
 * @Author: RannarYang 
 * @Date: 2018-09-06 00:11:26 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-10-28 11:34:51
 */
class DropOffOreAction extends GoapAction{
	private droppedOffOre = false;
	public target: SupplyPileComponent; // where we drop off the ore
	public constructor() {
		super();
		this.addPrecondition (ActionStatus.HasOre, true); // can't drop off ore if we don't already have some
		this.addEffect (ActionStatus.HasOre, false); // we now have no ore
		this.addEffect (ActionStatus.CollectOre, true); // we collected ore
	}

	public reset() {
		this.droppedOffOre = false;
	}

	public isDone(): boolean {
		return this.droppedOffOre;
	}
	public requiresInRange() {
		return true; // yes we need to be near a supply pile so we can drop off the ore
	}
	public checkProceduralPrecondition (agent: VGameObject): boolean{
		//TODO: find the nearest supply pile that has spare ore
		let supplyPiles: SupplyPileComponent[] = Environment.supplyPileComps;
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

		this.target = closest;
		
		return closest != null;
	}
	
	public perform (labourer: Labourer): boolean {
		let backpack: BackPackComponent = labourer.backpack;
		this.target.numOre += backpack.numOre;
		this.droppedOffOre = true;
		backpack.numOre = 0;
		//TODO play effect, change actor icon
		
		return true;
	}
}