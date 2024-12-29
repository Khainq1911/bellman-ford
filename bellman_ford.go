package main

import (
	"fmt"
	"math"
)


type Edge struct {
	source, destination, weight int
}


func BellmanFord(vertices int, edges []Edge, source int) ([]int, bool) {
	
	distance := make([]int, vertices)
	for i := 0; i < vertices; i++ {
		distance[i] = math.MaxInt32
	}
	distance[source] = 0

	
	for i := 0; i < vertices-1; i++ {
		for _, edge := range edges {
			u, v, w := edge.source, edge.destination, edge.weight
			if distance[u] != math.MaxInt32 && distance[u]+w < distance[v] {
				distance[v] = distance[u] + w
			}
		}
	}

	
	for _, edge := range edges {
		u, v, w := edge.source, edge.destination, edge.weight
		if distance[u] != math.MaxInt32 && distance[u]+w < distance[v] {
			return nil, false
		}
	}

	return distance, true
}

func main() {
	
	vertices := 6
	edges := []Edge{
		{0, 1, 6},
		{0, 2, -2},
		{0, 3, 5},
		{1,5,7},
		{2,3,3},
		{3,4,-9},
		{4,5,4},
		{5,2,-5},
	}

	
	source := 0
	distances, noNegativeCycle := BellmanFord(vertices, edges, source)

	if !noNegativeCycle {
		fmt.Println("Graph contains a negative-weight cycle")
	} else {
		fmt.Println("Shortest distances from source:", source)
		for i, d := range distances {
			fmt.Printf("Vertex %d: %d\n", i, d)
		}
	}
}
