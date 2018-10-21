class StateMove extends StateBase {
    public owner: GoapAgent;
	/**
     * 状态更新 
     * @return 
     */		
    public onUpdate(timeStamp: number): void {
        let iGoap: IGoap = this.owner.getOwner();
        
        // move the game object

        let action: GoapAction = this.owner.peekCurrentActions();
        if(action.requiresInRange() && action.target == null) {
            console.log("Fatal error: Action requires a target but has none. Planning failed. You did not assign the target in your Action.checkProceduralPrecondition()");
            this.owner.changeState(StateEnum.StateIdle);
            return;
        }

        // get the agent to move itself
        if(iGoap.moveAgent(action)) {
            this.owner.changeState(StateEnum.StatePerformAction);
        }
    }
}