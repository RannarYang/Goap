/*
 * @Description: Holds resources for the Agent
 * @Author: Rannar.Yang 
 * @Date: 2018-09-05 20:44:56 
 * @Last Modified by: Rannar.Yang
 * @Last Modified time: 2018-09-05 20:50:47
 */
class BackPackComponent {
	public tool;
	public numLogs: number;
	public numFirewood: number;
	public numOre: number;
	public toolType = "toolAxe";

	public hasOre() {
		return this.numOre > 0;
	}

	public hasLog() {
		return this.numLogs > 0;
	}

	public hasFirewood() {
		return this.numFirewood > 0;
	}

	public hasTool() {
		return this.tool != null;
	}
}