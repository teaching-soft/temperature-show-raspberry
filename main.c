/***************************************************************************
	progetto			: "Raspberry Temperature Show"
    file:				: main.c
    begin               : mer apr 21 10:34:57 CET 2011
    copyright           : (C) 2011 by Giancarlo Martini
    email               : gm@giancarlomartini.it
 ***************************************************************************/

/***************************************************************************
 *                                                                         *
 *   This program is free software; you can redistribute it and/or modify  *
 *   it under the terms of the GNU General Public License as published by  *
 *   the Free Software Foundation; either version 2 of the License, or     *
 *   (at your option) any later version.                                   *
 *                                                                         *
 ***************************************************************************/



#include <stdlib.h>
#include <stdio.h>
#include <unistd.h>
#include "rs232.h"

/* Serial message format: value\n es. 127\n */
#define MAX_LEN_VALUE   4
#define true 1
#define false 0

void empty_serial_buffer(int ttys_descriptor);
void read_serial_value(int ttys_descriptor,char *value);
int get_value(const char *device, char *buffer);
const char DEVICE[] = "/dev/ttyUSB0";

int main(int argc, char *argv[]) {
	char value[10];
	printf("Content-Type:text/html;charset=utf8\n\n");
	// Legge un valore, in caso di errore il msg lo invia prima
	if(get_value(DEVICE,value) == true)	printf("OK|%s",value);
	return EXIT_SUCCESS;
}

int get_value(const char *device, char *buffer) {

	// Prova ad aprire il device/porta seriale
	int ttys_descriptor = rs232_open(device,B9600,CS8,PNONE,SB1);
	if(ttys_descriptor == -1) {
		perror("ERROR|SERIAL ERROR:Port not open!!!\nSerial port is:");
		printf("%s\n",device);
		return false;
	}
	// Elimina eventuali dati parziali
	empty_serial_buffer(ttys_descriptor);
	read_serial_value(ttys_descriptor,buffer);
	rs232_close(ttys_descriptor);
	return true;
}
void empty_serial_buffer(int ttys_descriptor) {
	char buffer[10];
	int bytes;
	//fflush(ttys_descriptor);
	while(1) {
		bytes = rs232_bytes_arrived(ttys_descriptor,2);
		if(bytes <= 0) continue;
		rs232_read(ttys_descriptor,buffer,1);
		if(buffer[0] != '\n') continue;
		// I prossimi dati sono completi
		break;
	}
}

void read_serial_value(int ttys_descriptor,char *value) {
	int bytes, pos = 0;
	char buffer[10];
	char dummy[1000];
	while(1) {
		bytes = rs232_bytes_arrived(ttys_descriptor,2);
		if(bytes <= 0) continue;

		rs232_read(ttys_descriptor,buffer,1);
		// Controlla se è arrivato il fine valore
		if(buffer[0] == '\n') {
			value[pos] = '\0';
			return;
		}
		if(isdigit(buffer[0]) == 0) continue;
		value[pos] = buffer[0];
		pos++;
		if(pos > MAX_LEN_VALUE) {
			value[pos] = '\0';
			//printf("Anomalia in ricezione, valore troppo lungo:%s\nAspetto il successivo",value);
			pos = 0;
			empty_serial_buffer(ttys_descriptor);
		}

	}
}
