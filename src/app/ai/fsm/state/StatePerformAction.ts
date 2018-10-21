class StatePerformAction extends StateBase{
    public owner: GoapAgent;

	/**
     * 状态更新 
     * @return 
     */		
    public onUpdate(timeStamp: number): void {
        // perform the action
        let iGoap: IGoap = this.owner.getOwner();

        if(!this.owner.hasActionPlan()) {
            // no actions to perform
            console.log("Done actions");
            this.owner.changeState(StateEnum.StateIdle);
            iGoap.actionsFinished();
            return;
        }
        let action: GoapAction = this.owner.peekCurrentActions();
        if(action.isDone()) {
            // the action is done. Remove it so we can perform the next one
            this.owner.dequeueCurrentActions();
        }

        if(this.owner.hasActionPlan()) {
            // perform the next action
            action = this.owner.peekCurrentActions();
            let inRange: boolean = action.requiresInRange() ? action.isInRange() : true;

            if(inRange) {
                // we are in range, so perform the action
                let success: boolean = action.perform(iGoap);

                if(!success) {
                    // action failed, we need to plan again
                    this.owner.changeState(StateEnum.StateIdle);
                    iGoap.planAborted(action);
                }
            } else {
                // we need to move there first
                //TODO: push moveTo state
                this.owner.changeState(StateEnum.StateMove);
            }
        } else {
            // no actions left, move to Plan state
            this.owner.changeState(StateEnum.StateIdle);
            iGoap.actionsFinished();
        }
    }
}