/*
 * @Description: 
 * @Author: RannarYang 
 * @Date: 2018-09-06 00:09:38 
 * @Last Modified by:   RannarYang 
 * @Last Modified time: 2018-09-06 00:09:38 
 */
/**
 * Any agent that wants to use GOAP must implement
 * this interface. It provides information to the GOAP
 * planner so it can plan what actions to use.
 * 
 * It also provides an interface for the planner to give 
 * feedback to the Agent and report success/failure.
 */
interface IGoap {
	/**
	 * The starting state of the Agent and the world.
	 * Supply what states are needed for actions to run.
	 */
	getWorldState (): Map<string, Object>;

	getAvaliableActions(): GoapAction[];

	/**
	 * Give the planner a new goal so it can figure out 
	 * the actions needed to fulfill it.
	 */
	createGoalState (): Map<string, Object>;

	/**
	 * No sequence of actions could be found for the supplied goal.
	 * You will need to try another goal
	 */
	planFailed (failedGoal: Map<string, Object>): void;

	/**
	 * A plan was found for the supplied goal.
	 * These are the actions the Agent will perform, in order.
	 */
	planFound (goal: Map<string, Object>, actions: GoapAction[]): void;

	/**
	 * All actions are complete and the goal was reached. Hooray!
	 */
	actionsFinished (): void;

	/**
	 * One of the actions caused the plan to abort.
	 * That action is returned.
	 */
	planAborted (aborter: GoapAction): void;

	/**
	 * Called during Update. Move the agent towards the target in order
	 * for the next action to be able to perform.
	 * Return true if the Agent is at the target and the next action can perform.
	 * False if it is not there yet.
	 */
	moveAgent(nextAction: GoapAction): boolean;
}