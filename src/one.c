/**
 The One Programming Language
 File: one.c
  _        _
 / \ |\ | |_    Max Base <maxbasecode@gmail.com>
 \_/ | \| |_    Copyright 2023; One Language Contributors
 **/

#include "one.h"
#include "cli.h"

/**
 * @brief Main function
 * 
 * @param argc 
 * @param argv 
 * 
 * @return int 
 */
int main(int argc, char** argv)
{
    cli_t* cli = cli_init(argc, argv);
    int res = cli_run(cli);
    cli_free(cli);

    return res;
}
