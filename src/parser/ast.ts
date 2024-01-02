import { Token, TokenType } from '../lexer/token';

export abstract class Ast {
    type: string = "ast";
}

export class MainAst {
    ast: Ast[] = [];
    
    push(ast: Ast) {
        this.ast.push(ast);
    }
};

export class AstBody implements Ast {
    type: string = "body";
    stmts: Ast[] = [];

    constructor(stmts: Ast[]) {
        this.stmts = stmts;
    }
};

export class AstExpression implements Ast {
    type: string = "expression";
    valuetype: string;
    value: any;

    constructor(valuetype: string, value: any) {
        this.valuetype = valuetype;
        this.value = value;
    }
}

export class AstStatementReturn implements Ast {
    type: string = "return";
    value: AstExpression;

    constructor(value: AstExpression) {
        this.value = value;
    }
}

export class AstStatement implements Ast {
    type: string;

    constructor(type: string) {
        this.type = type;
    }
};

export class AstFunctionArgument implements Ast {
    type: string = "function_argument";
    datatype: string; // TODO
    name: string;

    constructor(datatype: string, name: string) {
        this.datatype = datatype;
        this.name = name;
    }
};

export class AstFunction implements Ast {
    type: string = "function";
    name: string;
    args: AstFunctionArgument[];
    body: AstBody;

    constructor(name: string, args: AstFunctionArgument[], body: AstBody) {
        this.name = name;
        this.args = args;
        this.body = body;
    }
};

class AstExpressionSub implements AstExpression {
    expr: AstExpression;

    constructor(expr: AstExpression) {
        this.expr = expr;
    }
}

class AstExpressionTernary implements AstExpression {
    clause: AstExpression;
    true_path: AstExpression;
    false_path: AstExpression;

    constructor(clause: AstExpression, true_path: AstExpression, false_path: AstExpression) {
        this.clause = clause;
        this.true_path = true_path;
        this.false_path = false_path;
    }
}

class AstExpressionPostfix implements AstExpression {
    lhs: AstExpression;
    operator: Token;

    constructor(lhs: AstExpression, operator: Token) {
        this.lhs = lhs;
        this.operator = operator;
    }
}

class AstExpressionPrefix implements AstExpression {
    type: string = "expression_prefix";
    operator: Token;
    rhs: AstExpression;

    constructor(operator: Token, rhs: AstExpression) {
        this.operator = operator;
        this.rhs = rhs;
    }
}

// An expression is anything that can be evaluated, A number literal is an expression.
class AstExpressionLiteral implements AstExpression {
    type: string = "expression_literal";
    valuetype: string;
    value: any;

    constructor(valuetype: string, value: any) {
        this.value = value;
        this.valuetype = valuetype;
    }
}

class AstExpressionBinary implements AstExpression {
    type: string = "expression_binary";
    lhs: AstExpression;
    operator: Token;
    rhs: AstExpression; 

    constructor(lhs: AstExpression, operator: Token, rhs: AstExpression) {
        this.lhs = lhs;
        this.operator = operator;
        this.rhs = rhs;
    }
}
