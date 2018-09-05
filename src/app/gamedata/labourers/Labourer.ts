/*
 * @Description: {} 
 * @Author: Rannar.Yang 
 * @Date: 2018-09-05 20:52:30 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-06 00:23:36
 */
/**
 * A general labourer class.
 * You should subclass this for specific Labourer classes and implement
 * the createGoalState() method that will populate the goal for the GOAP
 * planner.
 */
abstract class Labourer implements IGoap{
	private backpack: BackPackComponent;
	public start() {
		this.backpack = new BackPackComponent();
	}

	public abstract createGoalState();
}