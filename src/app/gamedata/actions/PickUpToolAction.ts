/*
 * @Description: 
 * @Author: RannarYang 
 * @Date: 2018-09-06 00:15:38 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-06 00:16:12
 */
class PickUpToolAction extends GoapAction {
	private hasTool: boolean = false;
	private targetSupplyPile: SupplyPileComponent; // where we get the tool from
	public constructor() {
		super();
		this.addPrecondition ("hasTool", false); // don't get a tool if we already have one
		this.addEffect ("hasTool", true); // we now have a tool
	}

	public reset(): void {
		this.hasTool = false;
		this.targetSupplyPile = null;
	}

	public isDone(): boolean {
		return this.hasTool;
	}

	public requiresInRange(): boolean {
		return true;
	}

	public checkProceduralPrecondition (agent: VGameObject): boolean{
		//TODO: find the nearest supply pile that has spare tools
		let supplyPiles: SupplyPileComponent[] = [];
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

		this.targetSupplyPile = closest;
		this.target = this.targetSupplyPile;

		return closest != null;
	}

	public perform (labourer: Labourer): boolean {
		if (this.targetSupplyPile.numTools > 0) {
			this.targetSupplyPile.numTools -= 1;
			this.hasTool = true;

			// create the tool and add it to the agent

			let backpack: BackPackComponent = labourer.backpack;
			// TODO:
			// GameObject prefab = Resources.Load<GameObject> (backpack.toolType);
			// GameObject tool = Instantiate (prefab, transform.position, transform.rotation) as GameObject;
			// backpack.tool = tool;
			// tool.transform.parent = transform; // attach the tool

			return true;
		} else {
			// we got there but there was no tool available! Someone got there first. Cannot perform action
			return false;
		}
	}
}