/*
 * @Description: 
 * @Author: RannarYang 
 * @Date: 2018-09-06 00:15:38 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-11-04 17:47:27
 */
class PickUpToolAction extends GoapAction {
	private hasTool: boolean = false;
	public target: SupplyPileComponent; // where we get the tool from
	public constructor() {
		super();
		this.addPrecondition (ActionStatus.HasTool, false); // don't get a tool if we already have one
		this.addEffect (ActionStatus.HasTool, true); // we now have a tool
	}

	public reset(): void {
		this.hasTool = false;
	}

	public isDone(): boolean {
		return this.hasTool;
	}

	public requiresInRange(): boolean {
		return true;
	}

	public checkProceduralPrecondition (agent: VGameObject): boolean{
		//TODO: find the nearest supply pile that has spare tools
		let supplyPiles: SupplyPileComponent[] = Environment.supplyPileComps;
		let closest: SupplyPileComponent = null;
		let closestDist: number = 0;

		for (let supply of supplyPiles) {
			if (supply.numTools > 0) {
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
		}
		if (closest == null)
			return false;

		this.target = closest;

		return closest != null;
	}

	public perform (labourer: Labourer): boolean {
		if (this.target.numTools > 0) {
			this.target.numTools -= 1;
			this.hasTool = true;
			// create the tool and add it to the agent
			labourer.pickUpTool();
			return true;
		} else {
			// we got there but there was no tool available! Someone got there first. Cannot perform action
			return false;
		}
	}
}