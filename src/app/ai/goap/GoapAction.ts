/*
 * @Description: 
 * @Author: RannarYang 
 * @Date: 2018-09-06 00:09:26 
 * @Last Modified by:   RannarYang 
 * @Last Modified time: 2018-09-06 00:09:26 
 */
class GoapAction {
	private preconditions: Object;
	private effects: Object;
	public constructor() {
		this.preconditions = {};
		this.effects = {};
	}

	public addPrecondition(key: string, value: any) {
		this.preconditions[key] = value;
	}

	public removePrecondition(key: string) {
		delete this.preconditions[key];
	}

	public addEffect(key: string, value: any) {
		this.effects[key] = value;
	}
	public removeEffect(key: string) {
		delete this.effects[key];
	}
	public get Preconditions() {
		return this.preconditions;
	}
	public get Effects() {
		return this.effects;
	}
}