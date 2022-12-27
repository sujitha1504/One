/**
 The One Programming Language
 File: cli.h
  _        _
 / \ |\ | |_    Max Base <maxbasecode@gmail.com>
 \_/ | \| |_    Copyright 2023; One Language Contributors
 **/

#ifndef _ONE_CLI_H_
#define _ONE_CLI_H_

#include <stdio.h> // printf
#include <stdlib.h> // malloc, free
#include <string.h> // strcmp

#include "file.h" // file_t, file_print
#include "token.h" // token_list_t
#include "lexer.h" // lexer_t, lexer_init, lexer_lex, lexer_free
#include "parser.h" // parser_t, parser_init, parser_parse, parser_ast
#include "ast.h" // ast_t, ast_print, ast_print_json
#include "generator.h" // generator_t, generator_init, generator_generate, generator_code, generator_free

typedef enum {
    CLI_HELP,
    CLI_VERSION,
    CLI_COMPILE,
    CLI_LEX,
    CLI_PARSE,
    CLI_GEN,
    // CLI_RUN,
    // CLI_TEST,
    // CLI_FORMAT,
    // CLI_LINT,
    // CLI_DOC,
    // CLI_INSTALL,
    // CLI_UNINSTALL,
    // CLI_CONFIG,
    CLI_UNKNOWN
} cli_command_t;

typedef struct {
    cli_command_t command;
    file_t* file;
    FILE* output;
    char* error;
    bool is_json;
    bool is_xml;
    // char* target;
    // char* arch;
    // char* os;
    // char* compiler;
    // char* linker;
    // char* flags;
    // char* libs;
    // char* libpath;
    // char* includepath;
    // char* defines;
    // char* run;
    // char* test;
    // char* format;
    // char* lint;
    // char* doc;
    // char* install;
    // char* uninstall;
    // char* config;
} cli_options_t;

typedef struct {
    int argc;
    char** argv;
    cli_options_t* options;
} cli_t;

/**
 * @brief Initialize the CLI object
 * 
 * @param int argc
 * @param char** argv
 * 
 * @return cli_t* 
 */
cli_t* cli_init(int argc, char** argv);


/**
 * @brief Initialize the CLI options object
 * 
 * @param void
 * 
 * @return cli_options_t* 
 */
cli_options_t* cli_options_init();

/**
 * @brief Parse the CLI arguments
 * 
 * @param cli_t* cli
 * 
 * @return cli_t*
 */
cli_t* cli_parse(cli_t* cli);

/**
 * @brief Run the CLI object
 * 
 * @param cli_t* cli
 * 
 * @return int 
 */
int cli_run(cli_t* cli);

/**
 * @brief Print the version of the compiler
 * 
 * @param cli_t* cli
 * 
 * @return void
 */
void cli_print_version(cli_t* cli);

/**
 * @brief Print the help message
 * 
 * @param cli_t* cli
 * 
 * @return void
 */
void cli_print_help(cli_t* cli);

/**
 * @brief Free the CLI object
 * 
 * @param cli_t* cli
 * 
 * @return void
 */
void cli_free(cli_t* cli);

#endif