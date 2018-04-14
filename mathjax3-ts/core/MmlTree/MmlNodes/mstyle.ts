/*************************************************************
 *
 *  Copyright (c) 2017 The MathJax Consortium
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

/**
 * @fileoverview  Implements the MmlMstyle node
 *
 * @author dpvc@mathjax.org (Davide Cervone)
 */

import {PropertyList} from '../../Tree/Node.js';
import {AbstractMmlLayoutNode, AttributeList} from '../MmlNode.js';
import {INHERIT} from '../Attributes.js';

/*****************************************************************/
/*
 *  Implements the MmlMstyle node class (subclass of AbstractMmlLayoutNode)
 */

export class MmlMstyle extends AbstractMmlLayoutNode {
    public static defaults: PropertyList = {
        ...AbstractMmlLayoutNode.defaults,
        scriptlevel: INHERIT,
        displaystyle: INHERIT,
        scriptsizemultiplier: 1 / Math.sqrt(2),
        scriptminsize: '8px',  // should be 8pt, but that is too large
        mathbackground: INHERIT,
        mathcolor: INHERIT,
        dir: INHERIT,
        infixlinebreakstyle: 'before'
    };

    /*
     * @return {string}  The mstyle kind
     */
    public get kind() {
        return 'mstyle';
    }

    /*
     * Handle scriptlevel changes, and add mstyle attributes to the ones being inherited.
     *
     * @override
     */
    protected setChildInheritedAttributes(attributes: AttributeList, display: boolean, level: number, prime: boolean) {
        let scriptlevel = this.attributes.getExplicit('scriptlevel');
        if (scriptlevel != null) {
            scriptlevel = scriptlevel.toString();
            if (scriptlevel.match(/^\s*[-+]/)) {
                level += parseInt(scriptlevel);
            } else {
                level = parseInt(scriptlevel);
            }
        }
        let displaystyle = this.attributes.getExplicit('displaystyle') as boolean;
        if (displaystyle != null) {
            display = (displaystyle === true);
        }
        attributes = this.addInheritedAttributes(attributes, this.attributes.getAllAttributes());
        this.childNodes[0].setInheritedAttributes(attributes, display, level, prime);
    }
}
