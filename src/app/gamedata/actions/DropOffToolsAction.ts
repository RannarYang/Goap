/*
 * @Description: 
 * @Author: RannarYang 
 * @Date: 2018-09-06 00:11:39 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-10-28 11:35:24
 */
class DropOffToolsAction extends GoapAction {
	private droppedOffTools: boolean = false;
	public target: SupplyPileComponent; // where we drop off the  tools
	public constructor() {
		super();
		this.addPrecondition (ActionStatus.HasNewTools, true); // can't drop off tools if we don't already have some
		this.addEffect (ActionStatus.HasNewTools, false); // we now have no tools
		this.addEffect (ActionStatus.CollectTools, true); // we collected tools
	}

	public reset(): void {
		this.droppedOffTools = false;
	}

	public isDone() {
		return this.droppedOffTools;
	}

	public requiresInRange() {
		return true; // yes we need to be near a supply pile so we can drop off the tools
	}

	public checkProceduralPrecondition (agent: VGameObject): boolean {
		//TODO: find the nearest supply pile that has spare tools
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
		this.target.numTools += 2;
		this.droppedOffTools = true;
		//TODO play effect, change actor icon
		
		return true;
	}
}