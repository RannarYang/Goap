/*
 * @Description: 
 * @Author: RannarYang 
 * @Date: 2018-09-06 00:09:35 
 * @Last Modified by:   RannarYang 
 * @Last Modified time: 2018-09-06 00:09:35 
 */
/**
 * Plans what actions can be completed in order to fulfill a goal state.
 */
class GoapPlanner {
	/**
	 * Plan what sequence of actions can fulfill the goal.
	 * Returns null if a plan could not be found, or a list of the actions
	 * that must be performed, in order, to fulfill the goal.
	 */
	public plan(labourer: IGoap, availableActions: GoapAction[], worldState: Map<string, Object>, goal: Map<string, Object>): GoapAction[] {
		// reset the actions so we can start fresh with them
		for (let a of availableActions) {
			a.doReset ();
		}

		// check what actions can run using their checkProceduralPrecondition
		let usableActions: GoapAction[] = [];
		for (let a of availableActions) {
			if ( a.checkProceduralPrecondition(labourer.getView()) ){
				usableActions.push(a);
			}
		}

		// we now have all actions that can run, stored in usableActions

		// build up the tree and record the leaf nodes that provide a solution to the goal.
		let leaves: PlanNode[] = [];

		// build graph
		let start: PlanNode = new PlanNode(null, 0, worldState, null);
		let success: boolean = this.buildGraph(start, leaves, usableActions, goal);

		if(!success) {
			// oh no, we didn't get a plan
			console.log("NO PLan");
		}

		// get the cheapest leaf
		let cheapest: PlanNode = null;
		for(let leaf of leaves) {
			if(cheapest == null) {
				cheapest = leaf;
			} else {
				if(leaf.runningCost < cheapest.runningCost) {
					cheapest = leaf;
				}
			}
		}

		// get its node and work back through the parents
		let result: GoapAction[] = [];
		let n: PlanNode = cheapest;
		while(n != null) {
			if(n.action != null) {
				result.push(n.action);
			}
			n = n.parent;
		}
		result.reverse();

		// hooray we have a plan!
		return result;
	}
	/**
	 * Create a subset of the actions excluding the removeMe one. Creates a new set.
	 */
	private actionSubset(actions: GoapAction[], removeMe: GoapAction): GoapAction[] {
		let subset: GoapAction[] = [];
		for(let a of actions) {
			if(a != removeMe) {
				subset.push(a);
			}
		}
		return subset;
	}

	/**
	 * Returns true if at least one solution was found.
	 * The possible paths are stored in the leaves list. Each leaf has a
	 * 'runningCost' value where the lowest cost will be the best action
	 * sequence.
	 */
	private buildGraph(parent: PlanNode, leaves: PlanNode[], usableActions: GoapAction[], goal: Map<string, Object>): boolean {
		let foundOne: boolean = false;

		// go through each action available at this node and see if we can use it here
		for(let action of usableActions) {
			// if the parent state has the conditions for this action's preconditions, we can use it here
			if(this.inState(action.Preconditions, parent.state)) {
				// apply the action's effects to the parent state
				let currentState: Map<string, Object> = this.populateState (parent.state, action.Effects);
				//Debug.Log(GoapAgent.prettyPrint(currentState));
				let node: PlanNode = new PlanNode(parent, parent.runningCost + action.cost, currentState, action);

				if(this.inState(goal, currentState)) {
					// we found a solution!
					leaves.push(node);
					foundOne = true;
				} else {
					// not at a solution yet, so test all the remaining actions and branch out the tree
					let subset: GoapAction[] = this.actionSubset(usableActions, action);
					let found = this.buildGraph(node, leaves, subset, goal);
					if(found) {
						foundOne = true;
					}
				}
			}
		}

		return foundOne;
	}

	/**
	 * Check that all items in 'test' are in 'state'. If just one does not match or is not there
	 * then this returns false.
	 */
	private inState(test: Map<string, Object>, state: Map<string, Object>): boolean {
		let testKeyArr = Array.from(test.keys());
		for(let key of testKeyArr) {
			if(test.get(key) != state.get(key)) {
				return false;
			}
		}
		return true;
	}

	/**
	 * Apply the stateChange to the currentState
	 */
	private populateState(currentState: Map<string, Object>, stateChange: Map<string, Object>): Map<string, Object> {
		let state: Map<string, Object> = new Map<string, Object>();
		// copy the KVPs over as new objects
		currentState.forEach((value: Object, key: string)=>{
			state.set(key, value);
		})

		let stateChangeKeyArr = Array.from(stateChange.keys());

		for(let key of stateChangeKeyArr) {
			// update the Value in state
			state.set(key, stateChange.get(key));
		}

		return state;
	}
}

class PlanNode {
	public parent: PlanNode;
	public runningCost: number;
	public state: Map<string, Object>;
	public action: GoapAction;

	constructor(parent: PlanNode, runningCost: number, state: Map<string, Object>, action: GoapAction) {
		this.parent = parent;
		this.runningCost = runningCost;
		this.state = state;
		this.action = action;
	}
}