import { Lexer } from '../lexer/lexer';
import { Token, TokenType } from '../lexer/token';
import { Ast, MainAst, AstBody, AstFunction, AstStatement, AstFunctionArgument } from './ast';

export class Parser {
    ast: MainAst = new MainAst();
    lexer: Lexer;
    errors: string[] = [];

    constructor(lexer: Lexer) {
        this.lexer = lexer;
        this.parse();
    }

    // match(lookingFor: TokenType): Token {
    //     const token: Token = this.lexer.match(lookingFor);
    //     if (token.type_id === TokenType.ERROR) {
    //         this.errors.push(token.error_message ?? "Error in match");
    //     }
    //     return token;
    // }

    parserFunctionArgument() {
        const type = this.lexer.match(TokenType.IDENT);
        const name = this.lexer.match(TokenType.IDENT);

        if (type.value === null || name.value === null) {
            const errorMessage = "Wrong token as type/name of function argument.";
            this.errors.push(errorMessage);
            return null;
        }

        return new AstFunctionArgument(
            type.value,
            name.value
        );
    }

    parseMainStatement(): Ast | null | undefined {
        const first_token = this.lexer.pop();
        if (first_token.type_id === TokenType.EOF) return undefined;

        switch (first_token.type_id) {
            case TokenType.FN: {
                const ast: AstFunction | null = this.parseFunction();
                return ast;
            } break;

            default: {
                console.log(" TOKEN ", first_token.type_id);
            } break;
        }

        return null;
    }

    parseStatement() {
        return new AstStatement(
            "1",
            "2",
        );
    }

    parseBody() {
        const open = this.lexer.match(TokenType.LBRACE);
        console.log("open: ", open);
        if (open.type_id === TokenType.ERROR && open.error_message !== null) {
            this.errors.push(open.error_message);
            return null;
        }

        const stmts : Ast[] = [];
        // while (! this.lexer.hasAny([TokenType.RBRACE, TokenType.EOF])) {
        //     const stmt: AstStatement | null = this.parseStatement();
        //     if (stmt === null) {
        //         const errorMessage = "Wrong token as statement.";
        //         this.errors.push(errorMessage);
        //         return null;
        //     }
        //     stmts.push(stmt);
        // }

        const close = this.lexer.match(TokenType.RBRACE);
        if (close.type_id === TokenType.ERROR && close.error_message !== null) {
            this.errors.push(close.error_message);
            return null;
        }

        return new AstBody(
            stmts,
        );
    }

    parseFunction() {
        const name = this.lexer.match(TokenType.IDENT);
        if (name.value === null) {
            const errorMessage = "Wrong token as function name.";
            this.errors.push(errorMessage);
            return null;
        }
        const args: AstFunctionArgument[] = [];

        if (this.lexer.skip(TokenType.LBRACE)) { // (
            if (! this.lexer.has(TokenType.RBRACE)) {
                console.log(this.parserFunctionArgument());
            }
            this.lexer.match(TokenType.RBRACE); // )
        }

        const body: AstBody | null = this.parseBody();
        if (body === null) {
            const errorMessage = "Wrong token as function body.";
            this.errors.push(errorMessage);
            return null;
        }

        return new AstFunction(
            name.value,
            args,
            body,
        );
    }

    parse() {
        while (true) {
            const ast: Ast | null | undefined = this.parseMainStatement();
            console.log("parse ast: ", ast);
            if (ast === undefined) break; // EOF
            else if (ast !== null) this.ast.push(ast);
        }
    }
    
    tree(): MainAst {
        return this.ast;
    }
};
