#include <stdio.h>
#include <stdlib.h>
#include "../builtins/file.h"
#include "../builtins/array.h"
#include "token.h"

typedef struct {
    char* source;
    char* current;
    char* original_source;

    int line;
    int column;

    array_token_t* tokens;
} lexer_t;

lexer_t* lexer_init(char* source);

bool lexer_is_at_end(lexer_t* lexer);

void lexer_scan_token(lexer_t* lexer);

lexer_t* lexer_scan_tokens(lexer_t* lexer);

void lexer_free(lexer_t* lexer);

void lexer_add_token(lexer_t* lexer, lexer_token_t* token);
