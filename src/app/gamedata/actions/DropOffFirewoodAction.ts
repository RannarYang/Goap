/*
 * @Description: 
 * @Author: RannarYang 
 * @Date: 2018-09-06 00:09:17 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-10-28 11:32:49
 */
class DropOffFirewoodAction extends GoapAction {
	private droppedOffFirewood: boolean = false;
	public constructor() {
		super();
		this.addPrecondition(ActionStatus.HasFirewood, true); // can't drop off firewood if we don't already have some
		this.addEffect(ActionStatus.HasFirewood, false); // we now have no firewood
		this.addEffect(ActionStatus.CollectFirewood, true); // we collected firewood
	}

	public reset(): void {
		this.droppedOffFirewood = false;
	}

	public isDone() {
		return this.droppedOffFirewood;
	}
	
	public requiresInRange() {
		return true; // yes we need to be near a supply pile so we can drop off the firewood
	}
	public checkProceduralPrecondition (agent: VGameObject): boolean {
		// TODO:find the nearest supply pile that has spare firewood
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
	
	public perform (iGoap: IGoap): boolean {
		let labourer = iGoap as Labourer;
		let backpack = labourer.backpack;
		backpack.numFirewood += backpack.numFirewood;
		this.droppedOffFirewood = true;
		backpack.numFirewood = 0;
		
		return true;
	}
}